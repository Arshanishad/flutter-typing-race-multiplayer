import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketClient {
  IO.Socket? socket;
  static SocketClient? _instance;
  SocketClient._internal() {
    IO.io('http://192.168.31.21', <String, dynamic>{
      'transport': ['WebSocket'],
      'autoConnect': false,
    });
    socket!.connect();
  }
  static SocketClient get instance {
    _instance ??= SocketClient._internal();
    return _instance!;
  }
}
