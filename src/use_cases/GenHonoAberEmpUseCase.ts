import { add } from "winston";
import { Database } from "../infra/database";

function joinWithCommasAndAnd(strings: string[]) {
  if (strings.length === 0) return "";
  if (strings.length === 1) return strings[0];
  return strings.slice(0, -1).join(", ") + " e " + strings[strings.length - 1];
}

export default class GenHonoAberEmpUseCase {
  async execute(usersid: string[]): Promise<string | null> {
    const users = await Database.person.findMany({
      where: {
        id: {
          in: usersid,
        },
      },
      include: {
        Address: true,
        Document: {
          include: {
            type: true,
          },
        },
      },
    });
    if (users.length === 0) return null;

    const hasData = users.every((user) => {
      const passport = user.Document.find(
        (doc) => doc.type.name === "PASSAPORTE"
      );
      const rg = user.Document.find((doc) => doc.type.name === "RG");
      const cpf = user.Document.find((doc) => doc.type.name === "CPF");
      console.log({ passport, rg, cpf, user });
      return (
        user.name &&
        user.nacionality &&
        user.civil_state &&
        user.profession &&
        user.natural_city &&
        user.natural_state &&
        user.natural_country &&
        user.birthDate &&
        user.father_name &&
        user.mother_name &&
        passport &&
        rg &&
        cpf
      );
    });

    if (!hasData) throw new Error("Missing data");

    const persons = users.map((user) => {
      const passport = user.Document.find(
        (doc) => doc.type.name === "PASSAPORTE"
      );
      const rg = user.Document.find((doc) => doc.type.name === "RG");
      const cpf = user.Document.find((doc) => doc.type.name === "CPF");
      console.log({ passport });

      const address =
        user.Address.filter((addr) => addr.main)[0] || user.Address[0];
      return `Pelo presente instrumento particular de Prestação de Serviços de Consultoria, ${
        user.name
      }, ${user.nacionality}, ${user.civil_state}, ${
        user.profession
      }, natural de ${user.natural_city}, ${user.natural_state}, ${
        user.natural_country
      }, nascid${user.gender === "M" ? "o" : "a"} em ${new Date(
        user.birthDate
      ).toLocaleDateString("pt-br", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}, filh${user.gender === "M" ? "o" : "a"} de ${user.father_name} e ${
        user.mother_name
      }, portador do documento do passaporte ${passport?.value} emitido em ${
        passport?.expedit
          ? new Date(passport.expedit.toString()).toLocaleDateString("pt-br")
          : ""
      } por ${passport?.expCorp} válido até ${
        passport?.expDate
          ? new Date(passport.expDate.toString()).toLocaleDateString("pt-br")
          : ""
      } e do documento de identidade R.G./CPF Nº ${cpf?.value}`;
    });

    console.log(`${joinWithCommasAndAnd(persons)}, denominados CONTRATANTES
    `);
    console.log(persons);
    return `${joinWithCommasAndAnd(persons)}, denominados CONTRATANTES`;
  }
}
