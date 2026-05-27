
import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketClient {
  IO.Socket? socket;
  SocketClient._internal(){
     socket=IO.io('http://192.168.31.21:3000',<String,dynamic>{
      'transports':['websocket'],
      'autoConnect':false,
     }) ;
     socket!.connect();
  }

}