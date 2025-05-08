export async function GET(){
    const res = await fetch("https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast");
    const json_data = await res.json();

    const { code, data, errorMsg } = json_data;
    const { area_metadata, items } = data ?? {};

    return Response.json({
        code,
        area_metadata,
        items,
        errorMsg
      });
}