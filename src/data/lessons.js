export const lessons = [
  {
    id: 1,
    title: "HTML入門",
    slides: [
      {
        type: "text",
        content: "HTMLは、Webページを作るためのマークアップ言語です。HTMLを使うことで、見出し・段落・リンクなどの要素を定義できます。"
      },
      {
        type: "text",
        content: "<h2>HTMLの基本構造</h2><pre><code>&lt;!DOCTYPE html&gt;<br>&lt;html&gt;<br>  &lt;head&gt;<br>    &lt;title&gt;ページのタイトル&lt;/title&gt;<br>  &lt;/head&gt;<br>  &lt;body&gt;<br>    コンテンツを書く部分<br>  &lt;/body&gt;<br>&lt;/html&gt;</code></pre>"
      },
      {
        type: "text",
        content: "<h2>見出しタグ</h2><p>&lt;h1&gt;〜&lt;h6&gt; で見出しを表します。数字が小さいほど大きな見出しです。</p><pre><code>&lt;h1&gt;大見出し&lt;/h1&gt;<br>&lt;h2&gt;中見出し&lt;/h2&gt;</code></pre>"
      },
      {
        type: "text",
        content: "<h2>段落と改行</h2><p>&lt;p&gt;は段落、&lt;br&gt;は改行を意味します。</p><pre><code>&lt;p&gt;これは段落です。&lt;/p&gt;<br>これは1行目。&lt;br&gt;これは2行目。</code></pre>"
      },
      {
        type: "exercise",
        description: "あなたの自己紹介をHTMLで書いてみましょう！",
        initialCode: "<h1>あなたの名前</h1>\n<p>ここに簡単な自己紹介を書きましょう。</p>"
      },
      {
        type: "text",
        content: "<h2>画像を表示する</h2><p>&lt;img&gt;タグを使って画像を表示します。<br>src属性に画像のパスを指定します。</p><pre><code>&lt;img src=&quot;/images/sample.png&quot; alt=&quot;サンプル画像&quot;&gt;</code></pre>"
      },
      {
        type: "text",
        content: "<h2>リンクを作る</h2><p>&lt;a&gt;タグで他のページへリンクできます。</p><pre><code>&lt;a href=&quot;https://example.com&quot;&gt;例のページへ&lt;/a&gt;</code></pre>"
      },
      {
        type: "exercise",
        description: "画像とリンクを含む簡単なプロフィールページを作ってみましょう！",
        initialCode: "<h1>私のプロフィール</h1>\n<img src=\"/images/sample.png\" alt=\"プロフィール画像\">\n<p>こんにちは！私はWeb制作を学んでいます。</p>\n<a href=\"https://example.com\">私の好きなサイト</a>"
      },
      {
        type: "text",
        content: "<h2>コメントの使い方</h2><p>HTML内にコメントを書くには &lt;!-- コメント --&gt; を使います。</p><pre><code>&lt;!-- これはコメントです --&gt;</code></pre>"
      },
      {
        type: "text",
        content: "<h2>おつかれさまでした！</h2><p>HTMLの基本を学びました。次はCSSに進んで、見た目を整える方法を学びましょう！</p>"
      }
    ]
  }
];
