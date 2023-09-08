class DBConnection {
  constructor(url) {
    if (DBConnection.instance) {
      return DBConnection.instance;
    }

    // Khởi tạo kết nối database
    this.isConnected = false;
    this.url = url;
    this.connect();
    DBConnection.instance = this;
  }

  connect() {
    // Simulate the connection process
    this.isConnected = true;
    console.log("Connected to database ", this.url);
  }

  disconnect() {
    // Simulate the disconnection process
    this.isConnected = false;
    console.log("Disconnected from database");
  }

  // Các phương thức khác của DBConnection
}

// Sử dụng
const dbConnection1 = new DBConnection("mongodb://example.com");
console.log(dbConnection1.isConnected); // true

const dbConnection2 = new DBConnection("mongodb://example.com"); // Sẽ trả về đối tượng đã được khởi tạo trước đó
console.log(dbConnection1 === dbConnection2); // true

dbConnection1.disconnect(); // Giả lập việc ngắt kết nối

console.log(dbConnection2.isConnected); // false
