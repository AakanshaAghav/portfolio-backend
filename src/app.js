const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const skillsRoutes = require("./routes/skills.routes");
const projectsRoutes = require("./routes/projects.routes");
const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");
const aboutRoutes = require("./routes/about.routes");
const blogRoutes = require("./routes/blogs.routes");
const experienceRoutes = require("./routes/experience.routes");

require("./config/db");


app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("CMS backend running");
});

app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/experience", experienceRoutes);


module.exports = app;
