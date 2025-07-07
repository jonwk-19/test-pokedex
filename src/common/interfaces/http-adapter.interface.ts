// aca se tendra la definicio de lo que se necesita que una clase adaptadora
// en este caso http tenga que implementar para que pueda ser utilizada
// de forma segura en cualqueir otro servicio

export interface HttpAdapter {
  get<T>( url: string ): Promise<T>;
}
