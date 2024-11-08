import os
import fnmatch

def load_ignore_patterns(ignore_file):
    """
    读取gnore.txt文件并返回排除模式列表。
    """
    ignore_patterns = []
    if not os.path.exists(ignore_file):
        print(f"忽略文件 {ignore_file} 不存在，继续执行。")
        return ignore_patterns

    with open(ignore_file, 'r', encoding='utf-8') as f:
        for line in f:
            pattern = line.strip()
            if pattern and not pattern.startswith('#'):
                ignore_patterns.append(pattern)
    return ignore_patterns

def is_ignored(path, ignore_patterns):
    """
    检查给定的路径是否匹配任何排除模式。
    """
    for pattern in ignore_patterns:
        # 处理绝对路径模式
        if pattern.startswith('/'):
            pattern = pattern[1:]
            if fnmatch.fnmatch(path, pattern):
                return True
        else:
            if fnmatch.fnmatch(path, pattern) or fnmatch.fnmatch(os.path.basename(path), pattern):
                return True
    return False

def get_all_files(root_dir, ignore_patterns):
    """
    获取所有未被排除的文件路径列表。
    """
    all_files = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # 计算相对路径
        rel_dir = os.path.relpath(dirpath, root_dir)
        if rel_dir == '.':
            rel_dir = ''

        # 复制dirnames列表以便修改
        dirs_to_remove = []
        for dirname in dirnames:
            rel_path = os.path.join(rel_dir, dirname) if rel_dir else dirname
            if is_ignored(rel_path, ignore_patterns):
                dirs_to_remove.append(dirname)
        # 从dirnames中移除被忽略的目录，防止递归进入
        for dirname in dirs_to_remove:
            dirnames.remove(dirname)

        for filename in filenames:
            rel_path = os.path.join(rel_dir, filename) if rel_dir else filename
            # 检查文件是否被忽略
            if is_ignored(rel_path, ignore_patterns):
                continue
            all_files.append(rel_path)
    return all_files

def write_files_to_txt(file_list, output_file, root_dir):
    """
    将文件路径和内容写入输出文本文件。
    """
    with open(output_file, 'w', encoding='utf-8') as out_f:
        for file_path in file_list:
            full_path = os.path.join(root_dir, file_path)
            out_f.write(f"{file_path}\n```\n")
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                out_f.write(f"{content}\n```\n\n")
            except Exception as e:
                out_f.write(f"无法读取文件内容: {e}\n```\n\n")

def main():
    root_dir = os.getcwd()
    ignore_file = os.path.join(root_dir, 'gnore.txt')
    output_file = os.path.join(root_dir, 'all_files.txt')

    print("加载忽略模式...")
    ignore_patterns = load_ignore_patterns(ignore_file)
    print(f"忽略模式: {ignore_patterns}")

    print("遍历目录获取文件列表...")
    all_files = get_all_files(root_dir, ignore_patterns)
    print(f"找到 {len(all_files)} 个文件需要处理。")

    print(f"将文件内容写入 {output_file} 中...")
    write_files_to_txt(all_files, output_file, root_dir)
    print("完成！")

if __name__ == "__main__":
    main()
