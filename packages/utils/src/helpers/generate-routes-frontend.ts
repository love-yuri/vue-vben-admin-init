/*
 * @Author: love-yuri yuri2078170658@gmail.com
 * @Date: 2024-09-07 21:03:54
 * @LastEditTime: 2024-09-09 12:45:35
 * @Description: 生成路由-前端方式
 */
import type { RouteRecordRaw } from 'vue-router';

import { filterTree, mapTree } from '@vben-core/shared';

/**
 * 动态生成路由 - 前端方式
 */
async function generateRoutesByFrontend(
  routes: RouteRecordRaw[],
  roles: string[],
  forbiddenComponent?: RouteRecordRaw['component'],
): Promise<RouteRecordRaw[]> {
  // 根据角色标识过滤路由表,判断当前用户是否拥有指定权限
  // routers 来自 router/routers/modules/**/*.ts
  const finalRoutes = filterTree(routes, (route) => {
    return hasAuthority(route, roles);
  });

  // 如果没有禁止访问的页面则直接返回
  if (!forbiddenComponent) {
    return finalRoutes;
  }

  // 如果有禁止访问的页面，将禁止访问的页面替换为403页面
  return mapTree(finalRoutes, (route) => {
    if (menuHasVisibleWithForbidden(route)) {
      route.component = forbiddenComponent;
    }
    return route;
  });
}

/**
 * 判断路由是否有权限访问
 * 检查方式: 路由meta中的authority字段是否包含当前用户的角色标识
 * @param route
 * @param access
 */
function hasAuthority(route: RouteRecordRaw, access: string[]) {
  const authority = route.meta?.authority;

  // 如果不设置权限则直接返回true
  if (!authority) {
    return true;
  }

  // 检查是否包含角色
  const canAccess = access.some((value) => authority.includes(value));

  // 如果设置能够访问，则直接返回true
  return canAccess || menuHasVisibleWithForbidden(route);
}

/**
 * 判断路由是否在菜单中显示，但是访问会被重定向到403
 * 需要设置 authority 和 menuVisibleWithForbidden 属性
 * @param route
 */
function menuHasVisibleWithForbidden(route: RouteRecordRaw) {
  return (
    !!route.meta?.authority &&
    Reflect.has(route.meta || {}, 'menuVisibleWithForbidden') &&
    !!route.meta?.menuVisibleWithForbidden
  );
}

export { generateRoutesByFrontend, hasAuthority };
