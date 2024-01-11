import { baseUrl } from '@/shared';
import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = { baseURL: baseUrl };

export const axiosInstance = axios.create(axiosConfig);