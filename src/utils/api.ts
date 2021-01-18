import Axios, { AxiosResponse } from "axios";
import { SignInResp } from "./types/req-types";

class Api {
  public id: number = localStorage.getItem("id")
    ? Number.parseInt(localStorage.getItem("id") as string)
    : -1;
  private token: string = localStorage.getItem("token") as string;
  private client: string = localStorage.getItem("client") as string;
  private uid: string = localStorage.getItem("uid") as string;

  private setHeaders(v: AxiosResponse<any>) {
    this.token = v.headers["access-token"];
    this.client = v.headers["client"];
    this.uid = v.headers["uid"];
    localStorage.setItem("token", this.token);
    localStorage.setItem("client", this.client);
    localStorage.setItem("uid", this.uid);
  }

  public async signIn(email: string, password: string): Promise<SignInResp> {
    return Axios.post(
      "https://baseballcloud-back.herokuapp.com/api/v1/auth/sign_in",
      { email: email, password: password }
    )
      .then((v) => {
        this.setHeaders(v);
        return v.data.data;
      })
      .then((v: SignInResp) => {
        localStorage.setItem("id", v.id.toString());
        this.id = v.id;
        return v;
      });
  }

  public async signUp(
    email: string,
    password: string,
    password_confirmation: string,
    role: string
  ): Promise<SignInResp> {
    return Axios.post("https://baseballcloud-back.herokuapp.com/api/v1/auth/", {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      role: role,
    })
      .then((v) => {
        this.setHeaders(v);
        return v.data.data;
      })
      .then((v: SignInResp) => {
        localStorage.setItem("id", v.id.toString());
        this.id = v.id;
        return v;
      });
  }

  public async graphqlPost(query: string, variables: any) {
    return Axios.post(
      "https://baseballcloud-back.herokuapp.com/api/v1/graphql",
      {
        query: query,
        variables: variables,
      },
      {
        headers: this.getStandardHeaders(),
      }
    ).then((v) => v.data.data);
  }

  public async getPicture(url: string): Promise<string> {
    return Axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        Accept: "image/webp,*/*",
      },
    }).then((v) => Buffer.from(v.data, "binary").toString("base64"));
  }

  public async logout() {
    return Axios.delete(
      "https://baseballcloud-back.herokuapp.com/api/v1/auth/sign_out",
      { headers: this.getStandardHeaders() }
    );
  }

  public async uploadAws(picture: File) {
    return Axios.post(
      "https://baseballcloud-back.herokuapp.com/api/v1/s3/signed_url",
      { name: picture.name },
      {
        headers: this.getStandardHeaders(),
      }
    ).then((v) => v.data.signedUrl);
  }

  private getStandardHeaders() {
    return {
      "access-token": this.token,
      client: this.client,
      uid: this.uid,
    };
  }
}

const API = new Api();
export default API;
