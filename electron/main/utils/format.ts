import { type MusicTrack } from "../database/LocalMusicDB";
import { join } from "path";

/** 艺术家类型定义 */
type Artist = string | { name?: string };

/**
 * 获取艺术家名称
 * @param artists 艺术家数组或字符串
 * @returns 艺术家名称数组
 */
export const getArtistNames = (artists: Artist | Artist[]): string[] => {
  if (Array.isArray(artists)) {
    return artists
      .map((ar) => (typeof ar === "string" ? ar : ar?.name || ""))
      .filter((name) => name && name.trim().length > 0);
  }
  if (typeof artists === "string" && artists.trim().length > 0) {
    return [artists];
  }
  return [];
};

/** 处理后的音乐项接口 */
interface ProcessedMusicTrack extends Omit<MusicTrack, "title"> {
  /** 歌曲名称（映射自 title） */
  name: string;
  /** 封面路径（file:// 协议） */
  cover?: string;
  /** 音乐质量（映射自 bitrate） */
  quality: number;
  /** 文件大小（字节） */
  size: number;
  /** 播放时长（毫秒） */
  duration: number;
}

/**
 * 处理音乐列表，转换为前端所需格式
 * @param tracks 原始音乐列表
 * @param coverDir 封面目录
 * @returns 处理后的音乐列表
 */
export const processMusicList = (
  tracks: MusicTrack[],
  coverDir: string,
): ProcessedMusicTrack[] => {
  return tracks.map((track) => {
    let cover: string | undefined;
    if (track.cover) {
      const fullPath = join(coverDir, track.cover);
      cover = `file://${fullPath.replace(/\\/g, "/")}`;
    }
    return {
      ...track,
      name: track.title,
      cover,
      // 保持原始字节数，供前端使用 formatFileSize 处理
      size: track.size,
      // 转换为毫秒
      duration: track.duration * 1000,
      // 码率映射到 quality 字段
      quality: track.bitrate ?? 0,
    };
  });
};
