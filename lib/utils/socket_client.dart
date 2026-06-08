import 'package:socket_io_client/socket_io_client.dart' as IO;

// We are importing socket library
// IO = short name for socket package

class SocketClient {
  // This variable stores the socket connection
  // This holds the live connection
  // This is the “wire” between Flutter and server
  IO.Socket? socket;

  // This stores SINGLE object of this class
  // (used for singleton pattern - only one connection in whole app)
  // Ensures ONLY ONE socket connection exists
  static SocketClient? _instance;

  // PRIVATE CONSTRUCTOR
  // This runs when object is created
  // BUT only inside this class (cannot call from outside)
  SocketClient._internal() {

    // Creating socket connection to backend server
    socket = IO.io(
      'http://192.168.31.21:3000',

      // configuration options
      <String, dynamic>{
        'transports': ['websocket'], // use websocket (real-time fast connection)
        'autoConnect': false,        // don't connect automatically
      },
    );

    // manually connect socket to server
    socket!.connect();
  }

  // PUBLIC ACCESS POINT (getter)
  // This is how we get SocketClient object
  static SocketClient get instance {

    // If _instance is null → create new object
    // If already created → reuse same object
    _instance ??= SocketClient._internal();

    // return the object
    return _instance!;
  }
}