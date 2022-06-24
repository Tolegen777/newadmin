import axios, {AxiosResponse} from "axios";
import {$api, getEnvApi} from "../../api";
import {ILogin, ILoginResponse} from "../../types/ILogin";
import {IProfileUpdateData, IUser} from "../../types/IProfile";

export class AuthService {
    static async login(creds: ILogin): Promise<AxiosResponse<ILoginResponse>> {
        return $api.post<ILoginResponse>(`auth/login`, creds)
    }

    static async fetchProfile(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`user/me`)
    }

    static async refresh(): Promise<AxiosResponse<ILoginResponse>> {
        return axios.get<ILoginResponse>(`${getEnvApi()}auth/refresh`, {withCredentials: true})
    }

    static async logout(): Promise<AxiosResponse<ILoginResponse>> {
        return axios.get<ILoginResponse>(`${getEnvApi()}auth/logout`, {withCredentials: true})
    }

    static async updateProfileAvatar(profileData: IProfileUpdateData): Promise<AxiosResponse<IProfileUpdateData>> {
        const formData = new FormData();
        if (profileData?.image) {
            formData.append('image', profileData.image)
        }
        if (profileData?.instagram) {
            formData.append('instagram', profileData.instagram)
        }
        if (profileData?.phone) {
            formData.append('phone', profileData.phone)
        }
        return $api.put<IProfileUpdateData>(`shop/update/${profileData.id}`, formData,)
    }
}
