import streamlit as st
from chatbot import chatbot 

import streamlit.components.v1 as components

with open("output.html", "r") as f:
    html = f.read()

components.html(html, height=500)

components.html()


def main():
    st.title("chatbot")

    
    chatbot = chatbot()

    # Add a text input for the user's message
    user_input = st.text_input("You:", "")

    # Add a button to submit the user's message
    if st.button("Send"):
        # Get the chatbot's response to the user's message
        bot_response = chatbot.get_response(user_input)

        # Display the chatbot's response
        st.text_area("Chatbot:", value=bot_response, height=200, max_chars=None)

        import chatbot

if __name__ == '__main__':
	bot = chatbot()
	bot.start()
