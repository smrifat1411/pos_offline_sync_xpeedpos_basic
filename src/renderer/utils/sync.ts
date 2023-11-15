import { replaceDataToLocal } from "../api/api";
import { getUnSyncedData, postUnsyncToApi } from "../service/service";

const sync = async (localDbColl: any, postApiUrl: any) => {
  const suspeciousLocalData = await getUnSyncedData(localDbColl);
  console.log(suspeciousLocalData);

  if (suspeciousLocalData.length > 0) {
    const postSuspeciousToApi = await postUnsyncToApi(
      postApiUrl,
      suspeciousLocalData
    );

    const replaceLocalData = await replaceDataToLocal(
      localDbColl,
      postSuspeciousToApi
    );

    console.log("replaced Data:", replaceLocalData);
    console.log("Sync Done");
  } else {
    console.log("Nothing to Sync");
  }
};

export { sync };
