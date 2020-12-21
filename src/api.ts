import Axios, { AxiosResponse } from "axios";

class Api {
  public token: string = localStorage.getItem("token") as string;
  public client: string = localStorage.getItem("client") as string;
  public uid: string = localStorage.getItem("uid") as string;

  private setHeaders(v: AxiosResponse<any>) {
    this.token = v.headers["access-token"];
    this.client = v.headers["client"];
    this.uid = v.headers["uid"];
    localStorage.setItem("token", this.token);
    localStorage.setItem("client", this.client);
    localStorage.setItem("uid", this.uid);
  }

  public async signIn(
    email: string,
    password: string
  ): Promise<{ id: number; email: string; role: string }> {
    return Axios.post(
      "https://baseballcloud-back.herokuapp.com/api/v1/auth/sign_in",
      { email: email, password: password }
    ).then((v: AxiosResponse<any>) => {
      this.setHeaders(v);
      return v.data;
    });
  }

  public async signUp(
    email: string,
    password: string,
    password_confirmation: string,
    role: string
  ): Promise<{ id: number; email: string; role: string }> {
    return Axios.post("https://baseballcloud-back.herokuapp.com/api/v1/auth/", {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      role: role,
    }).then((v) => {
      this.setHeaders(v);
      return v.data;
    });
  }

  public async getUserInfo() {
    return Axios.post(
      "https://baseballcloud-back.herokuapp.com/api/v1/graphql",
      {
        query:
          "{ current_profile ()\n{\nid\nfirst_name\nlast_name\nposition\nposition2\navatar\nthrows_hand\nbats_hand\nbiography\nschool_year\nfeet\ninches\nweight\nage\nschool {\nid\nname\n}\nteams {\nid\nname\n}\nfacilities {\nid\nemail\nu_name\n}\n}\n}",
      },
      {
        headers: {
          "access-token": this.token,
          client: this.client,
          uid: this.uid,
        },
      }
    ).then((v) => v.data);
  }
}

const API = new Api();
export default API;
