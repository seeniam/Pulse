import { describe, expect, it } from "vitest";
import { classifyTaskStatus } from "./taskStatus.js";

describe("classifyTaskStatus", () => {
  it('classifies "EM PROGRESSO" as doing', () => {
    expect(classifyTaskStatus("EM PROGRESSO")).toBe("doing");
  });

  it('classifies "em progresso" as doing', () => {
    expect(classifyTaskStatus("em progresso")).toBe("doing");
  });

  it('classifies "in progress" as doing', () => {
    expect(classifyTaskStatus("in progress")).toBe("doing");
  });

  it('classifies "PENDENTE" as todo', () => {
    expect(classifyTaskStatus("PENDENTE")).toBe("todo");
  });

  it('classifies "to do" as todo', () => {
    expect(classifyTaskStatus("to do")).toBe("todo");
  });

  it('classifies "closed" as done', () => {
    expect(classifyTaskStatus("closed")).toBe("done");
  });

  it('classifies "concluído" as done', () => {
    expect(classifyTaskStatus("concluído")).toBe("done");
  });

  it('classifies "concluido" as done', () => {
    expect(classifyTaskStatus("concluido")).toBe("done");
  });

  it('classifies "feito" as done', () => {
    expect(classifyTaskStatus("feito")).toBe("done");
  });

  it('classifies "done" as done', () => {
    expect(classifyTaskStatus("done")).toBe("done");
  });

  it("classifies unknown or empty status as todo", () => {
    expect(classifyTaskStatus("")).toBe("todo");
    expect(classifyTaskStatus("desconhecido")).toBe("todo");
  });
});
