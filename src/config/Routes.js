import { namespace, resources } from "@system/Router";

namespace("v1", (resources) => {

  resources("/todos", "v1/TodoController", { is_private: false });
});


resources("/todos", "v1/TodoController", { is_private: false });

