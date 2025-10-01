import { CORE_BRAND } from "@/core/consts/consts";
import SMLogo from "@/core/components/branding/SMLogo";

const AuthBranding = () => {
  return (
    <div className="flex items-center min-h-full rounded-l-xl bg-brand-100 dark:bg-gray-800">
      <div className="flex flex-col justify-center py-12 w-full">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl text-center font-bold">
            <SMLogo className="w-12 inline-block mr-2 rounded-full" />
            {CORE_BRAND}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AuthBranding;