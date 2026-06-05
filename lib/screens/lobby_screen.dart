import 'package:flutter/material.dart';

class LobbyScreen extends StatelessWidget {
  final List<String> players;
  final bool isHost;

  const LobbyScreen({
    super.key,
    required this.players,
    required this.isHost,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Lobby")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const Text(
              "Waiting for players...",
              style: TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 20),

            /// Players List
            Expanded(
              child: ListView.builder(
                itemCount: players.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    leading: const Icon(Icons.person),
                    title: Text(players[index]),
                    trailing: index == 0
                        ? const Text("Host")
                        : null,
                  );
                },
              ),
            ),

            /// Start Button (only host)
            if (isHost)
              ElevatedButton(
                onPressed: () {
                  // TODO: emit startGame event
                },
                child: const Text("Start Game"),
              ),
          ],
        ),
      ),
    );
  }
}