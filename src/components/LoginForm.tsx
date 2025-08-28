"use client";

export default function LoginForm() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    // 簡易バリデーション
    if (!email || !password) throw new Error("必須項目です");

    // NestJS に送信して JWT を取得
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" ,},
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    console.log(res);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">メールアドレス</label>
          <input
            className="border border-blue-200"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">パスワード</label>
          <input
            className="border border-blue-200"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button
          className="border border-blue-200 hover:bg-blue-200 cursor-pointer"
          type="submit"
        >
          ログイン
        </button>
      </div>
    </form>
  );
}
