import fastify from 'fastify';
import { initUnblockAPI } from '../electron/server/unblock/index'; // 根据实际导出方式调整

// 创建 Fastify 实例
const app = fastify({
  logger: true,
});

// 注册你的 UnblockAPI 路由，并统一添加 /api 前缀
app.register(initUnblockAPI, { prefix: '/api' });

// Vercel Serverless Function 处理器
export default async (req: any, res: any) => {
  await app.ready();
  app.server.emit('request', req, res);
};
