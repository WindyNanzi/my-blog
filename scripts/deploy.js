import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import { execaCommand } from 'execa';
import { NodeSSH } from 'node-ssh';
import sshConfig from './sshConfig.js';

const __filename = fileURLToPath(import.meta.url);
// 拿到当前文件所在文件夹路径
const __dirname = resolve(dirname(__filename));

const step = (msg) => console.log(chalk.bold.cyan(msg));
const SRC_DIR = resolve(__dirname, '../dist');
const DIST_DIR = '/var/blog/dist';

async function run() {
  step('项目打包中...');
  await execaCommand('yarn build');
  step('打包完成!');

  step('创建ssh连接...');
  const ssh = new NodeSSH();
  await ssh.connect(sshConfig);
  step('连接成功！');

  step('删除部署目录文件...');
  await ssh.execCommand(`cd ${DIST_DIR}`);
  await ssh.execCommand('rm -f *');
  step('删除完成！');

  step('传输打包好得文件到部署目录...');
  await ssh
    .putDirectory(SRC_DIR, DIST_DIR, {
      tick(localfile, remotefile, err) {
        console.log(localfile);
        console.error(err);
      },
      concurrency: 10,
      recursive: true,
    })
    .catch((err) => console.error(err));
  step('传输完成！');

  step('重启 docker 容器...');
  await ssh.execCommand('docker restart blog');
  step('重启完成！');

  ssh.dispose();
  step('查看效果：http://175.178.70.15/');
}

run();
