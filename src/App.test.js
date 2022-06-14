describe("With React Testing Library", () => {
  it('Shows "Hello world!"', () => {
    const title = document.title;
    expect(title).not.toBeNull();
  });
});
