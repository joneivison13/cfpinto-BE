import { date } from "zod";
import { Database } from "../infra/database";
import GenProcuracaoUseCase from "./GenProcuracaoUseCase";

describe("[UseCase] - GenProcuracaoUseCase", () => {
  test("Deve gerar o texto da procuração corretamente", async () => {
    const users = [
      {
        id: "aaa",
        name: "John Doe",
        nacionality: "Brazilian",
        civil_state: "Single",
        profession: "Engineer",
        natural_city: "Sao Paulo",
        natural_state: "SP",
        natural_country: "Brazil",
        gender: "M",
        birthDate: "1990-01-01T12:00:00",
        father_name: "John Doe Sr.",
        mother_name: "Jane Doe",
        Document: [
          {
            type: { name: "PASSAPORTE" },
            value: "123456789",
            expedit: "2025-01-01T12:00:00",
            expDate: "2025-01-01T12:00:00",
            expCorp: "Government",
          },
          { type: { name: "RG" }, value: "987654321", expCorp: "Government" },
          { type: { name: "CPF" }, value: "123.456.789-00" },
        ],
        Address: [
          {
            street: "Main Street",
            number: "123",
            neighborhood: "Downtown",
            postal_code: "12345-678",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            main: true,
          },
          {
            street: "Second Street",
            number: "456",
            neighborhood: "Suburb",
            postal_code: "98765-432",
            city: "Rio de Janeiro",
            state: "RJ",
            country: "Brazil",
            main: false,
          },
        ],
      },
    ];

    jest.spyOn(Database.person, "findMany").mockResolvedValue(users as any);

    const genProcuracaoUseCase = new GenProcuracaoUseCase();
    const result = await genProcuracaoUseCase.execute(["aaa"]);

    console.log({ result });

    const expectedText =
      "JOHN DOE, Brazilian, Single, Engineer, natural da cidade de Sao Paulo-SP, Brazil, nascido em 01/01/1990, filho de John Doe Sr. e Jane Doe, portador do passaporte 123456789, expedido em 01/01/2025 por Government, com validade até 01/01/2025, e do documento de identidade RG 987654321, emitido por Government, inscrito no cadastro de pessoa física CPF nº 123.456.789-00, com morada na Rua Main Street n° 123, Bairro Downtown, CEP 12345-678, Sao Paulo, SP – Brazil." +
      ` Nomeio como meu procurador CARLOS FREDERICO PINTO NASCIMENTO, nome profissional FREDERICO NASCIMENTO, inscrito na OA com nº 60967P, com escritório em Rua Engenheiro Frederico Ulrich 1804, 2 esquerdo, Maia – Porto, CP 4475-1360, telemóvel 933 132 999, e-mail advassociadospi@gmail.com, concedendo-lhe plenos poderes para me representar junto à Direção Geral de Ensino Superior, DGES, Universidade do Porto e Faculdade de Medicina do Porto em tudo o que respeita ao Reconhecimento Específico de Diploma do mesmo.`;

    expect(result).toEqual(expectedText);
  });
});
