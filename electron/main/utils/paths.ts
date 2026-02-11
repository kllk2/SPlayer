import { join } from "node:path";
import { useStore } from "../store";

/**
 * 获取本地数据相关的路径配置
 * @returns 包含各种路径的对象
 */
export const getLocalDataPaths = () => {
  const store = useStore();
  const localCachePath = join(store.get("cachePath"), "local-data");
  return {
    /** 数据库文件路径 */
    dbPath: join(localCachePath, "library.db"),
    /** 旧版 JSON 文件路径 */
    jsonPath: join(localCachePath, "library.json"),
    /** 封面目录路径 */
    coverDir: join(localCachePath, "covers"),
    /** 缓存根目录 */
    cacheDir: localCachePath,
  };
};

/**
 * 获取封面目录路径
 * @returns 封面目录的完整路径
 */
export const getCoverDir = (): string => {
  return getLocalDataPaths().coverDir;
};
