import { sign, verify } from "jsonwebtoken";
import { configuration } from "../config/config";

class JwtService {
  generateAccessToken(id: number, walletId: number) {
    return sign({ id: id, walletId: walletId }, configuration.secret, {
      expiresIn: "2h",
    });
  }

  validateToken(token: string, config: string) {
    return verify(token, config);
  }
}

export default new JwtService();
