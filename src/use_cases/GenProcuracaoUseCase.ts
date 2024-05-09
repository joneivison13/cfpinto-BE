import { add } from "winston";
import { Database } from "../infra/database";

function joinWithCommasAndAnd(strings: string[]) {
  if (strings.length === 0) return "";
  if (strings.length === 1) return strings[0];
  return strings.slice(0, -1).join(", ") + " e " + strings[strings.length - 1];
}

export default class GenProcuracaoUseCase {
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
      return `${user.name.toUpperCase()}, ${user.nacionality}, ${
        user.civil_state
      }, ${user.profession}, natural da cidade de ${user.natural_city}-${
        user.natural_state
      }, ${user.natural_country}, nascid${
        user.gender === "M" ? "o" : "a"
      } em ${new Date(user.birthDate).toLocaleDateString("pt-br")}, filh${
        user.gender === "M" ? "o" : "a"
      } de ${user.father_name} e ${user.mother_name}, portador${
        user.gender === "M" ? "" : "a"
      } do passaporte ${passport!.value}, expedido em ${
        passport?.expedit
          ? new Date(passport.expedit.toString()).toLocaleDateString("pt-br")
          : ""
      } por ${passport?.expCorp}, com validade até ${
        passport?.expDate
          ? new Date(passport.expDate.toString()).toLocaleDateString("pt-br")
          : ""
      }, e do documento de identidade RG ${rg?.value}, emitido por ${
        rg?.expCorp
      }, inscrito no cadastro de pessoa física CPF nº ${
        cpf?.value
      }, com morada na Rua ${address.street} n° ${address.number}, Bairro ${
        address.neighborhood
      }, CEP ${address.postal_code}, ${address.city}, ${address.state} – ${
        address.country
      }`;
    });

    console.log(`${joinWithCommasAndAnd(
      persons
    )}. Nomeio como meu procurador CARLOS FREDERICO PINTO NASCIMENTO, nome profissional FREDERICO NASCIMENTO, inscrito na OA com nº 60967P, com escritório em Rua Engenheiro Frederico Ulrich 1804, 2 esquerdo, Maia – Porto, CP 4475-1360, telemóvel 933 132 999, e-mail advassociadospi@gmail.com, concedendo-lhe plenos poderes para me representar junto à Direção Geral de Ensino Superior, DGES, Universidade do Porto e Faculdade de Medicina do Porto em tudo o que respeita ao Reconhecimento Específico de Diploma do mesmo.
    `);
    console.log(persons);
    return `${joinWithCommasAndAnd(
      persons
    )}. Nomeio como meu procurador CARLOS FREDERICO PINTO NASCIMENTO, nome profissional FREDERICO NASCIMENTO, inscrito na OA com nº 60967P, com escritório em Rua Engenheiro Frederico Ulrich 1804, 2 esquerdo, Maia – Porto, CP 4475-1360, telemóvel 933 132 999, e-mail advassociadospi@gmail.com, concedendo-lhe plenos poderes para me representar junto à Direção Geral de Ensino Superior, DGES, Universidade do Porto e Faculdade de Medicina do Porto em tudo o que respeita ao Reconhecimento Específico de Diploma do mesmo.`;
  }
}
