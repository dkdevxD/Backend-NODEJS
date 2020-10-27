class Tables {
  init(conn) {
    this.conn = conn;
    this.users()
    // this.drop();
  }
  users() {
    const qry = `CREATE TABLE IF NOT EXISTS tbl_users (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(64) NOT NULL,
      PRIMARY KEY (id)
    )`

    this.conn.query(qry, error => {
      if (error) {
        console.log();
      }
      console.log('Users tables created!');
    });
  }

  drop() {
    const qry = 'DROP TABLE tbl_users'

    this.conn.query(qry, error => {
      if (error) {
        console.log
      }
      console.log('Users tables cleared!');
    })
  }
}

module.exports = new Tables;