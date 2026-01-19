import { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "たびくみにおける個人情報の取り扱いについて説明します。",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-sky-900">
            プライバシーポリシー
          </h1>
          <p className="mt-2 text-slate-600">
            たびくみにおける個人情報の取り扱いについて説明します。
          </p>
        </div>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700">
            たびくみ（以下、「本サービス」）は、
            ユーザーのプライバシーを尊重し、以下の方針に基づいて運営します。
          </p>

          <hr className="my-8 border-slate-200" />

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-sky-900">
              取得する情報について
            </h2>
            <p className="mb-4 text-slate-700">
              本サービスでは、以下の情報を取得する場合があります。
            </p>
            <ul className="ml-6 list-disc space-y-2 text-slate-700">
              <li>サービス利用時に入力された旅行条件（出発地点、行きたい場所など）</li>
              <li>アクセス解析のための匿名情報（IPアドレス、ブラウザ情報など）</li>
            </ul>
            <p className="mt-4 text-slate-700">
              ※ 氏名、住所、電話番号、メールアドレスなどの
              <strong className="text-slate-900">個人を特定できる情報は取得していません。</strong>
            </p>
          </section>

          <hr className="my-8 border-slate-200" />

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-sky-900">
              利用目的について
            </h2>
            <p className="mb-4 text-slate-700">
              取得した情報は、以下の目的にのみ利用します。
            </p>
            <ul className="ml-6 list-disc space-y-2 text-slate-700">
              <li>旅行プラン作成機能の提供</li>
              <li>サービス改善のための分析</li>
              <li>不具合の調査・対応</li>
            </ul>
          </section>

          <hr className="my-8 border-slate-200" />

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-sky-900">
              情報の管理について
            </h2>
            <p className="mb-2 text-slate-700">
              本サービスでは、
              入力された旅行条件を恒久的に保存することはありません。
            </p>
            <p className="text-slate-700">
              また、取得した情報は適切に管理し、
              不正アクセスや漏洩の防止に努めます。
            </p>
          </section>

          <hr className="my-8 border-slate-200" />

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-sky-900">
              第三者提供について
            </h2>
            <p className="text-slate-700">
              法令に基づく場合を除き、
              取得した情報を第三者に提供することはありません。
            </p>
          </section>

          <hr className="my-8 border-slate-200" />

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-sky-900">
              外部サービスの利用について
            </h2>
            <p className="mb-2 text-slate-700">
              本サービスでは、機能提供のために
              外部のAPIサービスを利用する場合があります。
            </p>
            <p className="text-slate-700">
              その際、必要最低限の情報のみを送信し、
              目的外の利用は行いません。
            </p>
          </section>

          <hr className="my-8 border-slate-200" />

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-sky-900">
              プライバシーポリシーの変更について
            </h2>
            <p className="mb-2 text-slate-700">
              本ポリシーの内容は、予告なく変更されることがあります。
            </p>
            <p className="text-slate-700">
              変更後の内容は、本ページにて速やかに公開します。
            </p>
          </section>

          <hr className="my-8 border-slate-200" />

          <section>
            <h2 className="mb-4 text-xl font-bold text-sky-900">
              お問い合わせ
            </h2>
            <p className="text-slate-700">
              本ポリシーに関するお問い合わせについては、
              今後設置予定のお問い合わせ窓口よりご連絡ください。
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}