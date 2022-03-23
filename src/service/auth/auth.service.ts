import axios, { AxiosResponse } from "axios";
import { $api, getEnvApi } from "../../api";
import { ILogin, ILoginResponse } from "../../types/ILogin";
import { IProfileUpdate, IUser } from "../../types/IProfile";

export class AuthService {
    static async login(creds: ILogin): Promise<AxiosResponse<ILoginResponse>> {
        return $api.post<ILoginResponse>(`auth/login`, creds)
    }
    static async fetchProfile(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`user/me`)
    }
    static async refresh(): Promise<AxiosResponse<ILoginResponse>> {
        return axios.get<ILoginResponse>(`${getEnvApi()}auth/refresh`, { withCredentials: true })
    }
    static async logout(): Promise<AxiosResponse<ILoginResponse>> {
        return axios.get<ILoginResponse>(`${getEnvApi()}auth/logout`, { withCredentials: true })
    }
    static async updateProfileAvatar(profile: IProfileUpdate): Promise<AxiosResponse<IUser>> {
        const formData = new FormData();
        if (profile?.avatar) {
            formData.append('avatar', profile.avatar)
        }
        const headers = {
            accept: "multipart/form-data"
        }
        return $api.put<IUser>(`profile/${profile.id}`, formData, { headers })
    }
}
