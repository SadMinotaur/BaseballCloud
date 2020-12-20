import Axios from "axios";

class Api {
  private token: string = "";

  public async signIn(
    email: string,
    password: string
  ): Promise<{ id: number; email: string; role: string }> {
    return Axios.post(
      "https://baseballcloud-back.herokuapp.com/api/v1/auth/sign_in",
      { email: email, password: password }
    ).then((v) => {
      this.token = v.headers["access-token"];
      return v.data;
    });
  }

  // {"password_confirmation":"12121212","password":"12121212","email":"di@gmail.com","role":"player"}
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
      this.token = v.headers["access-token"];
      console.log(v);
      return v.data;
    });
  }
}

const API = new Api();
export default API;
