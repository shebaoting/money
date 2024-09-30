<?php

namespace Shebaoting\Money\Controller;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Shebaoting\Money\Serializer\MoneyLogSerializer;
use Shebaoting\Money\Model\MoneyLog;
use Flarum\Http\UrlGenerator;

class UserMoneyLogsController extends AbstractListController
{
    public $serializer = MoneyLogSerializer::class;

    // 设置默认分页和最大分页数
    public $limit = 20;
    public $maxLimit = 50;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        // 获取当前登录用户
        $actor = $request->getAttribute('actor');

        // 提取分页参数
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);

        // 获取用户的积分变动记录，按时间倒序排序
        $query = MoneyLog::where('user_id', $actor->id)
            ->orderBy('created_at', 'desc')
            ->skip($offset)
            ->take($limit);

        // 获取结果
        $logs = $query->get();

        // 获取 URL 生成器实例
        $urlGenerator = app(UrlGenerator::class);

        // 计算记录总数，用于分页链接
        $total = MoneyLog::where('user_id', $actor->id)->count();

        // 提取查询参数
        $queryParams = $request->getQueryParams();

        // 添加分页链接到文档
        $document->addPaginationLinks(
            $urlGenerator->to('api')->route('money.logs'),
            $queryParams,  // 传递查询参数数组
            $offset,
            $limit,
            $total
        );

        return $logs;
    }
}
