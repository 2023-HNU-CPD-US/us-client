import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/fetch", async () => {
    try {
        const response = await axios.get(
            "https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/",
            {
                headers: {
                    "Cache-Control": "no-cache",
                },
            }
        );
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
});
