// SUNUCUYU BU DOSYAYA KURUN

const express = require("express");

const server = express();
server.use(express.json());

const userModel = require("./users/model");

module.exports = server; // SERVERINIZI EXPORT EDİN {}

server.post("./api/users", async (req, res) => {
  try {
    let user = req.body;
    if (!user.bio || !user.name) {
      res
        .status(400)
        .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    } else {
      const newUser = await userModel.insert(user);
      res.status(201).json({ newUser });
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});
server.get("/api/users", async (req, res) => {
  try {
    let allusers = await userModel.find();
    res.status(200).json({ allusers });
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.get("/api/users/id", async (req, res) => {
  try {
    const idUsers = await userModel.findById(req.params.id);
    if (idUsers) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      res.status(200).json({ idUsers });
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});
server.delete("/api/users", async (req, res) => {
  try {
    const user = userModel.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      await userModel.remove(req.params.id);
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.put("/api/users", async (req, res) => {
  try {
    const user = userModel.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      const update = req.body;
      if (!update.id || update.bio) {
        res
          .status(400)
          .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
      } else {
        const newupdate = await userModel.update(req.params.id);
        res.status(200).json(newupdate);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});
