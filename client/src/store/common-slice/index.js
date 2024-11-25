import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
  error: null
};

export const getFeatureImages = createAsyncThunk(
  "common/getFeatureImages",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/common/feature/get`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

export const addFeatureImage = createAsyncThunk(
  "common/addFeatureImage",
  async (image) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/common/feature/add`,
        { image }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

export const deleteFeatureImage = createAsyncThunk(
  "common/deleteFeatureImage",
  async (imageId, { rejectWithValue }) => {
    try {
      console.log('Attempting to delete image with ID:', imageId);
      const response = await axios.delete(
        `http://localhost:5000/api/common/feature/delete/${imageId}`
      );
      console.log('Delete response:', response.data);
      
      if (!response.data.success) {
        return rejectWithValue(response.data.message || 'Failed to delete image');
      }
      
      return response.data;
    } catch (error) {
      console.error('Delete error:', error.response || error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to delete image'
      );
    }
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
        state.error = null;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = state.featureImageList.filter(
          (item) => item._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default commonSlice.reducer;
