import { JWT } from 'google-auth-library';
import 'dotenv/config'
import { google } from 'googleapis';
// import * as key from '../config/key.json';
import { findStartEnd } from './findStartEnd';
import { scrapeSurfline } from './scrapeSurfline';

// export async function exportWaveData(waveData: any) {
//     await sheets.spreadsheets.values.append({
//         auth: await authClient,
//         spreadsheetId: "1cJKNWsSeiT2gMNt7B-HMwHMdhMt7iEHtGX-jSCV0Mes",
//         range: "Sheet1!A1:A384",
//         valueInputOption: "RAW",
//         requestBody: {values: waveData, majorDimension: "COLUMNS"},
//       }, {});
//   }


// export const writeGoogleSheet = (waveData: any, event: any, context: any) => {
export function writeGoogleSheet() {
  const client = new google.auth.JWT(process.env.client_email, undefined, process.env.private_key, [
    'https://www.googleapis.com/auth/spreadsheets.readonly'
  ]);

  const writeSheet = async (auth: JWT) => {
    const sheets = google.sheets({
      version: 'v4',
      auth
    });

    const {startCell, endCell} = findStartEnd();

    const parsedWaveData = await scrapeSurfline();

    sheets.spreadsheets.values.append({
          auth: await client,
          spreadsheetId: "1cJKNWsSeiT2gMNt7B-HMwHMdhMt7iEHtGX-jSCV0Mes",
          range: `Sheet1!${startCell}:${endCell}}`,
          valueInputOption: "RAW",
          requestBody: { values: parsedWaveData, majorDimension: "COLUMNS" },
      }, {});
    // const options = {
    //   spreadsheetId: process.env.SPREADSHEETID,
    //   range: 'sheet1!A:C'
    // };
    // const { data } = await sheets.spreadsheets.values.append(options);
    // console.log(data.values);
  };

  client.authorize((err, tokens) => {
    if (err) {
      console.error(err);
      return;
    }
    writeSheet(client);
  });
}

// writeGoogleSheet();
