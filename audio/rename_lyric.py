import os

# 遍历当前文件夹中的所有文件和子文件夹
for filename in os.listdir("."):
    # 检查文件是否以.lrc结尾
    if filename.endswith(".lrc"):
        # 尝试将文件名从a-b格式分割为a和b
        # 注意：这里假设文件名确实符合a-b的格式，并且-只出现一次
        # 如果文件名不符合此格式，分割可能会失败或产生不预期的结果
        name_parts = filename.rsplit("-", 1)
        if len(name_parts) > 1:  # 确保-确实存在，即文件名确实可以分割
            # 构造新的文件名（只保留a部分，并加上.lrc扩展名）
            new_filename = name_parts[0] + ".lrc"
            # 检查新文件名是否与旧文件名不同，且新文件名不存在（避免覆盖）
            if new_filename != filename and not os.path.exists(new_filename):
                # 重命名文件
                os.rename(filename, new_filename)
                print(f'Renamed "{filename}" to "{new_filename}"')
            else:
                print(
                    f'No action taken for "{filename}" (already exists or no change needed)'
                )
        else:
            # 如果文件名不包含-，则不需要更改
            print(f'No action taken for "{filename}" (no "-" found)')
