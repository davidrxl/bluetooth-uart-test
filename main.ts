bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.A, function () {
    Debug("Press A", 1)
    bluetooth.uartWriteString("A")
})
function Debug (texte: string, num: number) {
    CountAction += num
    serial.writeLine(texte)
    serial.writeNumber(CountAction)
    serial.writeLine("")
}
input.onButtonPressed(Button.B, function () {
    Debug("Press B", 1)
    bluetooth.uartWriteString("B")
})
input.onGesture(Gesture.Shake, function () {
    Debug("Move on", 1)
    bluetooth.uartWriteString("S")
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    Debug(receivedString, 1)
    bluetooth.uartWriteLine(receivedString)
    if (receivedString == "P") {
        basic.showIcon(IconNames.Heart)
        basic.pause(100)
        basic.showIcon(IconNames.Yes)
    }
})
let receivedString = ""
let CountAction = 0
bluetooth.startUartService()
CountAction = 0
basic.showIcon(IconNames.Square)
Debug("Ready to connect!", 1)
