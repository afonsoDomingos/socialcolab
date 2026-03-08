import mongoose, { Schema, models, model } from "mongoose";

// ─── USER ──────────────────────────────────────────────────────────────────
const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true },
    department: { type: String, required: true },
    departmentId: { type: String, required: true },
    avatar: { type: String, default: "" },
    avatarPublicId: { type: String, default: "" },
    status: {
      type: String,
      enum: ["online", "busy", "away", "meeting"],
      default: "online",
    },
    bio: { type: String, default: "" },
    skills: [{ type: String }],
    location: { type: String, default: "" },
    completedTasks: { type: Number, default: 0 },
    recognitions: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);

// ─── POST ──────────────────────────────────────────────────────────────────
const PostSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["text", "announcement", "idea", "achievement"],
      default: "text",
    },
    department: { type: String, default: null },
    tags: [{ type: String }],
    image: { type: String, default: null },
    imagePublicId: { type: String, default: null },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Post = models.Post || model("Post", PostSchema);

// ─── TASK ──────────────────────────────────────────────────────────────────
const TaskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    assignee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    department: { type: String, required: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["todo", "inprogress", "review", "done"],
      default: "todo",
    },
    dueDate: { type: Date },
    tags: [{ type: String }],
    progress: { type: Number, default: 0, min: 0, max: 100 },
    attachments: [
      {
        name: String,
        url: String,
        publicId: String,
      },
    ],
  },
  { timestamps: true }
);

export const Task = models.Task || model("Task", TaskSchema);

// ─── PROJECT ───────────────────────────────────────────────────────────────
const ProjectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    department: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active",
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    dueDate: { type: Date },
    color: { type: String, default: "#2563EB" },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

export const Project = models.Project || model("Project", ProjectSchema);

// ─── IDEA ─────────────────────────────────────────────────────────────────
const IdeaSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["Produto", "Processo", "Cultura", "Tecnologia", "Cliente"],
      required: true,
    },
    status: {
      type: String,
      enum: ["submitted", "review", "approved", "implemented"],
      default: "submitted",
    },
    votes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Idea = models.Idea || model("Idea", IdeaSchema);

// ─── RECOGNITION ──────────────────────────────────────────────────────────
const RecognitionSchema = new Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    badge: { type: String, required: true },
  },
  { timestamps: true }
);

export const Recognition =
  models.Recognition || model("Recognition", RecognitionSchema);

// ─── EVENT ──────────────────────────────────────────────────────────────────
const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    department: { type: String, required: true },
    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    type: {
      type: String,
      enum: ["meeting", "training", "event", "deadline"],
      default: "meeting",
    },
    meetingUrl: { type: String, default: "" },
    location: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Event = models.Event || model("Event", EventSchema);

// ─── DOCUMENT ─────────────────────────────────────────────────────────────
const DocumentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    department: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fileUrl: { type: String, required: true },
    filePublicId: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    tags: [{ type: String }],
    confidentiality: {
      type: String,
      enum: ["public", "internal", "confidential", "secret"],
      default: "internal",
    },
    version: { type: Number, default: 1 },
    versions: [
      {
        fileUrl: String,
        filePublicId: String,
        uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
        uploadedAt: { type: Date, default: Date.now },
        version: Number,
        note: String,
      },
    ],
  },
  { timestamps: true }
);

export const Document = models.Document || model("Document", DocumentSchema);

// ─── MESSAGE ──────────────────────────────────────────────────────────────
const MessageSchema = new Schema(
  {
    conversation: { type: String, required: true }, // format: "userId1_userId2" sorted
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
    fileUrl: { type: String, default: null },
    filePublicId: { type: String, default: null },
    fileType: { type: String, default: null },
  },
  { timestamps: true }
);

export const Message = models.Message || model("Message", MessageSchema);
