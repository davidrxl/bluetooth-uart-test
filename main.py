def on_bluetooth_connected():
    basic.show_icon(IconNames.YES)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    basic.show_icon(IconNames.NO)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def on_button_pressed_a():
    bluetooth.uart_write_string("A")
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    bluetooth.uart_write_string("B")
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_shake():
    bluetooth.uart_write_string("S")
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def on_uart_data_received():
    global receivedString
    receivedString = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
    if receivedString == "P":
        basic.show_icon(IconNames.HEART)
        basic.pause(100)
        basic.show_icon(IconNames.YES)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.NEW_LINE),
    on_uart_data_received)

receivedString = ""
bluetooth.start_uart_service()
basic.show_icon(IconNames.SQUARE)