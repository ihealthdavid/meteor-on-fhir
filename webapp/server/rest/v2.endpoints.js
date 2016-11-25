JsonRoutes.add("get", "/open/hl7/v2", function (req, res, next) {
  if (process.env.OPEN) {
    console.log('GET /v2/Message/' + req.params.id);
    //console.log('res', res);

    console.log("params", req.params);


    JsonRoutes.sendResult(res, {
      code: 200,
      data: {text: "Hello!  Responding to the HL7 v2 message!"}
    });

  } else {
    console.log("Received a message on the /open channel.  Try setting the OPEN=true as an environment variable");
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});


JsonRoutes.add("get", "/open/hl7/v2/message/:id", function (req, res, next) {
  if (process.env.OPEN) {
    console.log('GET /v2/Message/' + req.params.id);
    //console.log('res', res);

    console.log("params", req.params);


    let textMessage = "Success!  Responding to the HL7 v2 message " + req.params.id;
    JsonRoutes.sendResult(res, {
      code: 200,
      data: {text: textMessage}
    });

  } else {
    if (process.env.NODE_ENV === "test") {
      console.log("Received a message on the /open channel.  Try setting the OPEN=true as an environment variable");
    }
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});

JsonRoutes.add("post", "/open/hl7/v2/message", function (req, res, next) {
  if (process.env.OPEN) {
    console.log("==================================================================================");
    console.log("Received a new HL7 v2 message at " + moment().format("MMM DD, YYYY hh:mm:ss a"));
    console.log('POST /v2/Message/');
    console.log("");

    console.log(req.body);

    let textMessage = "Success!  Wrote some text regarding message " + req.params.id + " to the command line.";
    JsonRoutes.sendResult(res, {
      code: 200,
      data: {text: textMessage}
    });
    console.log("");

  } else {
    if (process.env.NODE_ENV === "test") {
      console.log("Received a message on the /open channel.  Try setting the OPEN=true as an environment variable");
    }
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
