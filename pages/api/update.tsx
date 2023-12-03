import { exec } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
  try {
    const { Text } = req.query;

    const utf8Text = Text ? Buffer.from(Text).toString('utf-8') : '';

    const pythonScriptPath = path.join(process.cwd(), '../insert-text/main.py');

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
