import { IVideo } from "src/types/videoProps";

export const formatIdString = (list:IVideo[]) => {
    return list?.map((x) => "&id=" + x.snippet.resourceId.videoId).join("");
}