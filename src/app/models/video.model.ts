export interface ISearchListResponse {
  items: IVideoObject[];
  etag: string;
  kind: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

export interface IVideoObject {
  etag: string;
  kind: string;
  id: IYouTubeId;
  snippet: ISnippet;
  contentDetails: IContentDetails;
  statistics: IStatistics;
}

export interface IYouTubeId {
  kind: string;
  videoId: string;
}

export interface ISnippet {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishedAt: Date;
  thumbnails: IThumbnails;
  title: string;
}

export interface IContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  projection: string;
}

export interface IStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface IThumbnails {
  default: IImage;
  high: IImage;
  medium: IImage;
}

export interface IImage {
  url: string;
  height: number;
  width: number;
}
