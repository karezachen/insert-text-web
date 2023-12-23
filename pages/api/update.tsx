import { exec } from 'child_process';
import path from 'path';

export default async function handler(req: any, res: any) {

  const countChineseCharacters = (text: string) => {
    const chineseRegex = /[\u4e00-\u9fa5]/g;
    const chineseMatches = text.match(chineseRegex);
    return chineseMatches ? chineseMatches.length : 0;
  };

  try {
    const { Text } = req.query;

    const utf8Text = Text ? Buffer.from(Text).toString('utf-8') : '';

    let pythonScriptPath = path.join(process.cwd(), '../insert-text/main.py');

    console.log(`pythonScriptPath type: ${typeof pythonScriptPath}, value: ${pythonScriptPath}`);

    const chineseCharacterCount = countChineseCharacters(utf8Text);

    console.log(`chineseCharacterCount type: ${typeof chineseCharacterCount}, value: ${chineseCharacterCount}`);

    console.log(`2 type: ${typeof 2}, value: ${2}`);

    if (chineseCharacterCount === 2) {
      pythonScriptPath = path.join(process.cwd(), '../insert-text/two_words.py');
      console.log(`pythonScriptPath type: ${typeof pythonScriptPath}, value: ${pythonScriptPath}`);
    } else if (chineseCharacterCount === 3) {
      pythonScriptPath = path.join(process.cwd(), '../insert-text/third_words.py');
    } else {
      console.log(`chineseCharacterCount ${chineseCharacterCount} un equal 2`);
    }

    console.log(`pythonScriptPath type: ${typeof pythonScriptPath}, value: ${pythonScriptPath}`);

    const pythonBinPath = 'python3';

    exec(`${pythonBinPath} ${pythonScriptPath} ${utf8Text}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      console.log(`Python script output: ${stdout}`);
      res.status(200).json({ message: 'Python script executed successfully', output: stdout });
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
