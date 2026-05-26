import 'package:flutter/material.dart';

class CustomTextfield extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  const CustomTextfield({super.key,required this.controller,required this.hintText});

  @override
  Widget build(BuildContext context) {
    return  TextField(
      controller:controller ,
      decoration: InputDecoration(
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide:  BorderSide(color: Colors.transparent),
        ),
         enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide:  BorderSide(color: Colors.transparent),
        ),
        contentPadding: EdgeInsets.symmetric(vertical: 14,horizontal: 16),
        fillColor: Color(0xffF5F5FA),
        filled: true,
        hintText: hintText,
        hintStyle:  TextStyle(fontSize: 14,fontWeight: FontWeight.w400)
      ),
    );
  }
}