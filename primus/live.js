module.exports.go = (server) => {
  const primus = require("primus")(server, {
    transformer: "websockets",
  });

  primus.on("connection", (spark) => {
    console.log("connected 🔥");

    spark.on("data", (data) => {
      console.log("Received data from client:", data);
      primus.write(data);
    });
  });
};