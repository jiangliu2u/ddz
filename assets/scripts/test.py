from socketIO_client import SocketIO, LoggingNamespace

id = 0
def on_connect():
    print('connect')

def on_yourid(data):
    global id
    print(data)
    id = data['id'];
    print(id)

def deal_poker(data):
    print(data)

def on_aaa_response(*args):
    print('on_aaa_response', args)

socketIO = SocketIO('127.0.0.1', 3001, LoggingNamespace)
socketIO.on('yourid', on_yourid)
socketIO.wait(seconds=2)
print("id:{}".format(id))
socketIO.on('deal_poker', deal_poker)
socketIO.emit("MSG_DDZ_ENTER_TABLE", { 'cmd': "join", "tableId": 1, "player": id });
socketIO.wait(seconds=1000)
