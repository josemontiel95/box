export interface LoginResp {
    id_usuario: number,
    nombre: string,
    token: string,
    estatus: string,
    error: number,
    root: string,
    rol: string
}