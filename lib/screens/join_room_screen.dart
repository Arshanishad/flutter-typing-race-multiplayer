import 'package:flutter/material.dart';
import 'package:typeracer/widgets/custom_button.dart';
import 'package:typeracer/widgets/custom_textfield.dart';

class JoinRoomScreen extends StatefulWidget {
  const JoinRoomScreen({super.key});

  @override
  State<JoinRoomScreen> createState() => _JoinRoomScreenState();
}

class _JoinRoomScreenState extends State<JoinRoomScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _gameIdController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _gameIdController.dispose();
    super.dispose();
  }

  void joinRoom() {
    if (_nameController.text.trim().isEmpty ||
        _gameIdController.text.trim().isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Fill all fields')));
      return;
    }

    // TODO: call socket join
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF0F172A), Color(0xFF1E293B), Color(0xFF0F172A)],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 600),
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.white.withOpacity(0.15)),
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.login, size: 60, color: Colors.white),
                      const SizedBox(height: 24),
                      const Text(
                        'Join Room',
                        style: TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        'Enter room ID to join the battle',
                        style: TextStyle(color: Colors.white.withOpacity(0.6)),
                      ),
                      const SizedBox(height: 32),
                      CustomTextfield(
                        controller: _nameController,
                        hintText: 'Enter your nickname',
                      ),
                      const SizedBox(height: 20),
                      CustomTextfield(
                        controller: _gameIdController,
                        hintText: 'Enter Game ID',
                      ),
                      const SizedBox(height: 24),
                      CustomButton(
                        text: 'Join Room',
                        isHome: true,
                        onTap: joinRoom,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
