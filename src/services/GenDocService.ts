import "dotenv/config";
import { Person } from "@prisma/client";
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import fs from "fs";
import path from "path";
import GenProcuracaoUseCase from "../use_cases/GenProcuracaoUseCase";
import { Database } from "../infra/database";

interface GenProcuracaoContent {
  userdata: { name: string }[];
  text: string;
}
const documents_path = path.join(
  process.env.UPLOADS_PATH as string,
  "documents"
);

export async function genProcuracao(
  usersid: string[],
  gen_file: boolean = true
) {
  try {
    if (usersid.length === 0) throw new Error("No users found");
    const text_content = await new GenProcuracaoUseCase().execute(usersid);
    const userdata = await Database.person.findMany({
      where: {
        id: {
          in: usersid,
        },
      },
      select: {
        name: true,
      },
    });

    if (!text_content) throw new Error("No users found");
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "PROCURAÇÃO\n\n",
                  bold: true,
                  break: 2,
                  size: 32,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: text_content,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "\n\nPorto – Portugal, 19 de fevereiro de 2024.",
                  break: 2,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 700,
                before: 700,
              },
            }),
            ...[...userdata, ...userdata].map((user, indx) => {
              if (indx % 2 === 0) {
                return new Paragraph({
                  children: [
                    new TextRun({
                      text: `______________________________________________\t`,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                });
              }
              return new Paragraph({
                children: [
                  new TextRun({
                    text: `${user.name}`,
                    break: 1,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              });
            }),
          ],
        },
      ],
    });

    const b64string = await Packer.toBase64String(doc);

    if (!gen_file) return b64string;

    await fs.writeFileSync(
      path.join(documents_path, `${+new Date()}-procuração.docx`),
      b64string,
      "base64"
    );

    return b64string;
  } catch (error) {
    console.log(error);
    throw new Error("Error generating procuracao");
  }
}
