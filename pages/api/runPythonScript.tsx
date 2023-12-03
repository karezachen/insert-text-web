import { exec } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
  try {
    // 获取 URL 查询参数，假设参数名为 "chineseText"
    const { chineseText } = req.query;

    // 如果有中文参数，将其转换为 utf-8 编码
    const utf8ChineseText = chineseText ? Buffer.from(chineseText).toString('utf-8') : '';

    // 定义 Python 脚本的路径
    const pythonScriptPath = path.join(process.cwd(), '../insert-text/main.py');

    // 执行 Python 脚本，将中文参数传递给脚本
    exec(`/Users/chenyiqiang/WorkSpace/insert-text/venv/bin/python ${pythonScriptPath} ${utf8ChineseText}`, (error, stdout, stderr) => {
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
